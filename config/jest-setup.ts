import * as Enzyme from '../node_modules/enzyme'
import * as Adapter from '../node_modules/enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
