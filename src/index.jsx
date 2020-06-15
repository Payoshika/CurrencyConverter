class CurrencyInput extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const {value ,handleChange} = this.props;
    return(
      <input value={value} onChange={handleChange} type="number"/>
    )
  }
}

class CurrencyConverter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rate: 0.89,
      usd: 1,
      euro: 1 * 0.89
    };
    this.handleUsdChange = this.handleUsdChange.bind(this);
    this.handleEuroChange = this.handleEuroChange.bind(this);

  }

  toUsd = (amount, rate) => {
    return amount * (1 / rate);
  }

  toEuro = (amount, rate) => {
    return amount * rate;
  }

  convert(amount, rate, formula){
    const inputValue = parseFloat(amount)
    if(Number.isNaN(inputValue)){
      return "";
    }
    return formula(inputValue, rate).toFixed(3);
  }

  handleUsdChange(event){
    const {usd, euro ,rate} = this.state;
    const euroValue = parseFloat(event.target.value)
    const usdValue = this.convert(event.target.value, rate, this.toUsd)
    this.setState({
      usd: usdValue,
      euro: euroValue
    })
  }

  handleEuroChange(event){
    const {usd, euro ,rate} = this.state;
    const usdValue = parseFloat(event.target.value)
    const euroValue = this.convert(event.target.value, rate, this.toEuro)
    this.setState({
      usd: usdValue,
      euro: euroValue
    })
  }

  render(){
    const {rate, usd, euro} = this.state;
    return (
      <div className="container">
        <div className="text-center p-3 mb-2">
          <h2 className="mb-2">
            Currency Converter
          </h2>
          <h4>
            USD: 1 : {rate} EURO
          </h4>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <span className="mr-1">USD</span>
            <CurrencyInput value={usd} handleChange={this.handleEuroChange}/>
            <span className="mx-3">=</span>
            <CurrencyInput value={euro} handleChange={this.handleUsdChange}/>
            <span className="mr-1">EURO</span>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <CurrencyConverter />,
  document.getElementById("root")
)
