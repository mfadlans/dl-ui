import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import DropDownReact from '../../../form/basic/react/dropdown-react.jsx';

'use strict';

export default class MachineTypeIndicatorReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleIndicatorChange = this.handleIndicatorChange.bind(this);
        this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
        this.handleIndicatorDefaultValueChange = this.handleIndicatorDefaultValueChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleIndicatorChange(indicator) {
        var value = this.state.value;
        value.indicator = indicator;
        this.handleValueChange(value);
    }

    handleDataTypeChange(dataType) {
        var value = this.state.value;
        value.dataType = dataType;
        this.handleValueChange(value);
    }


    handleIndicatorDefaultValueChange(defaultData) {
        var value = this.state.value;
        value.defaultValue = defaultData;
        this.handleValueChange(value);
    }


    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() {
        var removeButton = null;
        var valueBox = null;

        var dropDownMenu = ["string", "numeric", "option (use ',' as delimiter)", "range (use '-' as delimiter)"];
        var readOnlyOptions = this.state.options.isMaster == true ? this.state.options : Object.assign({}, this.state.options, { readOnly: true });
        var readOnly = (this.state.value.dataType == "string" || this.state.value.dataType == "numeric") ? Object.assign({}, this.state.options, { readOnly: true }) : this.state.options;
        var dropdownOptions = Object.assign({}, readOnlyOptions, { selections: dropDownMenu });


        if (this.state.options.isMaster) {
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;
            if (this.state.value.dataType == "string") {
                var defaultText = "";
                var defaultNumeric = 0;
                valueBox = <TextboxReact value={defaultText} options={readOnly} onChange={this.handleIndicatorDefaultValueChange} />
            } else if (this.state.value.dataType == "numeric") {
                valueBox = <TextboxReact value={defaultText} options={readOnly} onChange={this.handleIndicatorDefaultValueChange} />
            } else if (this.state.value.dataType == "option (use ',' as delimiter)") {
                valueBox = <TextboxReact value={this.state.value.defaultValue} options={readOnlyOptions} onChange={this.handleIndicatorDefaultValueChange}/>
            } else {
                valueBox = <TextboxReact value={this.state.value.defaultValue} options={readOnlyOptions} onChange={this.handleIndicatorDefaultValueChange} />
            }
        }
        else {
            if (this.state.value.dataType == "string") {
                valueBox = <TextboxReact value={this.state.value.defaultValue} options={readOnly} onChange={this.handleIndicatorDefaultValueChange} />
            } else if (this.state.value.dataType == "numeric") {
                valueBox = <NumericReact value={this.state.value.defaultValue} options={readOnly} onChange={this.handleIndicatorDefaultValueChange} />
            } else if (this.state.value.dataType == "option (use ',' as delimiter)") {
                valueBox = <TextboxReact value={this.state.value.defaultValue} options={readOnly} onChange={this.handleIndicatorDefaultValueChange}/>
            } else {
                valueBox = <TextboxReact value={this.state.value.defaultValue} options={readOnly} onChange={this.handleIndicatorDefaultValueChange} />
            }

        }

        var style = {
            margin: 0 + 'px'
        }
        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.indicator ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.indicator} options={this.state.options} onChange={this.handleIndicatorChange}/>
                        <span className="help-block">{this.state.error.indicator}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dataType ? 'has-error' : ''}`} style={style}>
                        <DropDownReact value={this.state.value.dataType} options={dropdownOptions} onChange={this.handleDataTypeChange}/>
                        <span className="help-block">{this.state.error.dataType}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.defaultValue ? 'has-error' : ''}`} style={style}>
                        {valueBox}
                        <span className="help-block">{this.state.error.defaultValue} </span>
                    </div>
                </td>
                <td>
                    {removeButton}
                </td>
            </tr>
        )
    }
} 