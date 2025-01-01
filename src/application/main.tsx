import ReactDOM from 'react-dom/client';
import App from './App';

// 创建 root 节点并渲染
const root = document.createElement('div');
document.body.appendChild(root);

// 使用 React 18 的 createRoot 方法替代 render
const reactRoot = ReactDOM.createRoot(root); // 创建一个根渲染器
reactRoot.render(<App />); // 渲染 App 组件
