import { withRouter } from 'next/router'
import Layout from '../components/MyLayout';
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch' // 网络请求库
// withRouter将注入Next.js路由器作为属性，
// 可以过去路由器的query对象

/**
 * styled-jsx
 * 样式应该放在模板字符串中风格jsx作为babel插件。
 * 它将解析所有CSS并在构建过程中应用它。
 * （我们的样式可以在没有任何开销时间的情况下应用）
 * 它还支持在styled-jsx中设置约束。
 * 将来，您将能够在styled-jsx中使用任何动态变量。
 * 这就是CSS需要进入模板字符串的原因。（{``}）
 * */

/**
 * Global Styles: 全局样式
 * */

const Content = withRouter((props) => (
    <Layout>
        <h1>{props.router.query.title}</h1>
        <div className="markdown">
            <Markdown source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
     `}/>
        </div>
        <style jsx global>{`
     .markdown {
       font-family: 'Arial';
     }

     .markdown a {
       text-decoration: none;
       color: blue;
     }

     .markdown a:hover {
       opacity: 0.6;
     }

     .markdown h3 {
       margin: 0;
       padding: 0;
       text-transform: uppercase;
     }
  `}</style>
    </Layout>
));

const Post = (props) => (
    <Layout>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image.medium}/>
    </Layout>
);
// getInitialProps异步函数完成网络请求
// 接收的对象属性有：pathname, query,asPath,req, res, jsonPageRes, err

Post.getInitialProps = async function (context) {
    const { id } = context.query;
    // 请求网络数据
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()

    console.log(`Fetched show: ${show.name}`)
    // 返回普通对象Object,而不是Date, Map, Set等数据类型
    return { show }
}

export default Content