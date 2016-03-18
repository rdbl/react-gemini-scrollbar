var React = require('react');
var ReactDOM = require('react-dom');
var GeminiScrollbar = require('gemini-scrollbar');

module.exports = React.createClass({
    displayName: 'GeminiScrollbar',

    propTypes: {
        autoshow: React.PropTypes.bool,
        forceGemini: React.PropTypes.bool,
        onResize: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            autoshow: false,
            forceGemini: false
        }
    },

    /**
     * Holds the reference to the GeminiScrollbar instance.
     * @property scrollbar <public> [Object]
     */
    scrollbar: null,

    componentDidMount() {
        this.scrollbar = new GeminiScrollbar({
            element: ReactDOM.findDOMNode(this),
            autoshow: this.props.autoshow,
            forceGemini: this.props.forceGemini,
            createElements: false,
            onResize: this._onResize,
        }).create();
    },

    componentDidUpdate() {
        this.scrollbar.update();
    },

    componentWillUnmount() {
        this.scrollbar.destroy();
        this.scrollbar = null;
    },

    _onResize() {
        if (this.props.onResize) {
            this.props.onResize();
        }
    },

    render() {
        var {className, children, onResize, ...other} = this.props,
            classes = '';

        if (className) {
            classes += ' ' + className;
        }

        return (
            <div {...other} className={classes}>
                <div className='gm-scrollbar -vertical'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scrollbar -horizontal'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scroll-view' ref='scroll-view'>
                    {children}
                </div>
            </div>
        );
    }
});
