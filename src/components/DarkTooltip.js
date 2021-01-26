import {withStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const DarkTooltip = withStyles((theme) => ({
    arrow: {
        color: 'black'
    },
    tooltip: {
        backgroundColor: 'black',
        fontSize: '1em',
        fontWeight: '100',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }
  }))(Tooltip)


export default DarkTooltip