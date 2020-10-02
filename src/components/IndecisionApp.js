import React from 'react';

import AddOption from './AddOption'
import Options from './Options'
import Action from './Action'
import Header from './Header'
import OptionModal from './OptionModal'


class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    clearSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}));
    }

    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    }

    handleDeleteOption = (deleteOption) => {
        console.log('hdo ');
        this.setState((prevState) => ({
            options: prevState.options.filter((option)=> option!==deleteOption)
        }));
    }

    handlePick = () => {
        let pick = this.state.options[Math.floor(Math.random()*this.state.options.length)];
        // alert(pick);
        this.setState(() => ({
            selectedOption: pick
        }));
    }

    handleAddOption = (option) => {
        alert(option)
        if(!option) {
            return 'Enter valid option'
        } else if (this.state.options.indexOf(option) > -1) {
            return'Option already exists'
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }))
    }
    
    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if(options) {
                this.setState(()=> ({options}))
            }
        } catch (error) {
            alert(error)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('saving data')
        if(prevState.options.length!==this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    componentWillUnmount() {
        console.log('component will unmount')
    }

    render = () => {
        const title = "Indecision"
        const subtitle = "Put your life in the hands of a computer."
        // const options = ['thing1', 'thing2', 'thing4']

        console.log('this.state.options: ', this.state.options)

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                   <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions  = {this.handleDeleteOptions}
                            handleDeleteOption = {this.handleDeleteOption}
                         />
                        <AddOption handleAddOption={this.handleAddOption} />
                   </div>
                </div>
                <OptionModal
                    clearSelectedOption = {this.clearSelectedOption}
                    selectedOption={this.state.selectedOption}
                >
                </OptionModal>
            </div>
        )
    }
}


IndecisionApp.defaultProps = {
    options: []
}

export default IndecisionApp;