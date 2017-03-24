/**
 * 例子1：直接使用
 * <input
 *   type="text"
 *   name="myInput"                    // 一定要有 name 属性
 *   onClick={handleChange.bind(this)} // 绑定 this 到所属的组件
 *   value={this.state.myInput} />     // value 值同步 state
 *
 * 例子2：使用::绑定（例子1的语法糖）
 * onClick={this::handleChange}
 *
 * 例子3：在构造函数中声明（推荐，避免每次render都重复绑定）
 * constructor (props) {
 *   super(props)
 *   this.handleChange = handleChange.bind(this)
 * }
 * 之后就可以这样写了
 * onClick={this.handleChange}
 */
export default function handleChange(ev) {
  this.setState({
    [ev.target.name]: ev.target.value.trim()
  })
}
