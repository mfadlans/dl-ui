import React from 'react';

export default class SelectRoles extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            allChecked: false,
            checkedCount: 0,
            options: [
                { value: 'selectAll', text: 'Select All' },
                { value: 'orange', text: 'Orange' },
                { value: 'apple', text: 'Apple' },
                { value: 'grape', text: 'Grape' }
            ]
        };
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error || {} });
    }

    handleClick(e) {
        let clickedValue = e.target.value; 
        if (clickedValue === 'selectAll' && this.refs.selectAll.checked) {
            for (let i = 1; i < this.state.options.length; i++) {
                let value = this.state.options[i].value;
                this.refs[value].checked = true;
            }
            this.setState({
                checkedCount: this.state.options.length - 1
            });

        } else if (clickedValue === 'selectAll' && !this.refs.selectAll.checked) {
            for (let i = 1; i < this.state.options.length; i++) {
                let value = this.state.options[i].value;
                this.refs[value].checked = false;
            }
            this.setState({
                checkedCount: 0
            });
        }

        if (clickedValue !== 'selectAll' && this.refs[clickedValue].checked) {
            this.setState({
                checkedCount: this.state.checkedCount + 1
            });
        } else if (clickedValue !== 'selectAll' && !this.refs[clickedValue].checked) {
            this.setState({
                checkedCount: this.state.checkedCount - 1
            });
        }
        var selectedValues = $.map(this.refs, function(value, index){return value}).filter(option=>option.checked).map(option=>option.value) 
        this.handleValueChange(selectedValues);
    }

    render() {
        console.log('Selected boxes: ', this.state.checkedCount);

        const options = this.state.options.map((option, index) => {
            return (
                <div key={"__item" + index}>
                    <input onClick={this.handleClick} type='checkbox' name={option.value} key={option.value}
                        value={option.value} ref={option.value} /><label>{option.text}</label>
                </div>
            );
        });


        return (
            <div className='SelectBox'>
                <form>
                    {options}
                </form>
            </div>
        );
    }
}