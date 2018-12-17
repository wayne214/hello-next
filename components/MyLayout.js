/**
 * 通用的布局组件
 * */
import Header from './Header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};
// {props.children} // 渲染子组件
const Layout = (props) => (
    <div style={layoutStyle}>
        <Header/>
        {props.children}
    </div>
);

export default Layout