import React from 'react';

class InputNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };

    this.onChangeTitleInput = this.onChangeTitleInput.bind(this);
    this.onChangeBodyInput = this.onChangeBodyInput.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onChangeTitleInput(event) {
    const { value } = event.target;

    this.setState((prevState) => {
      return {
        ...prevState,
        title: value.length > 50 ? value.slice(0, 50) : value,
      };
    });
  }

  onChangeBodyInput(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        body: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    this.setState({ title: '', body: '' });
  }


  render() {
    return (
      <>
        <form onSubmit={this.onSubmitHandler} >
          <p className="text-sm font-semibold text-right text-secondary">Sisa Karakter: <span>{50 - this.state.title.length}</span></p>

          <input className="input" placeholder="Ini adalah judul..." type="text" name="search" required value={this.state.title} onChange={this.onChangeTitleInput} />

          <textarea className="input min-h-[175px]" placeholder="Tuliskan catatanmu disini..." required value={this.state.body} onChange={this.onChangeBodyInput}></textarea>

          <button className="block w-full py-1 pl-5 pr-1 mt-2 font-semibold bg-white border rounded-md shadow-sm border-slate-300 sm:text-sm hover:bg-sky-500 hover:text-white" type="submit">
            Buat
          </button>
          
        </form>
      </>
    );
  }
}
export default InputNote;
