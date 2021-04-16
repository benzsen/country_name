import React, {useState, useEffect} from 'react'
import axios from "axios"

const DisplayBasicData = ({countries})=>{
  const [data, updateData] = useState("")

  if (countries.length === 1){
      console.log("https://restcountries.eu/rest/v2/name/"+countries[0]+"?fullText=false");
      axios
        .get("https://restcountries.eu/rest/v2/name/"+countries[0]+"?fullText=false")
        .then(response => {
          console.log("data",response.data);
          return(
            updateData(response.data))
          })
  }
  console.log("past axios")
  return <p>{data.name}</p>

}

const DisplayCountries = (props)=>{
  const newFilter=props.newFilter.toLowerCase();
  const countryList=props.countryList;
  const countries = [];

  const filteredData = countryList.filter(country => country.name.toLowerCase().substring(0,newFilter.length)===newFilter);
  let mappedFilteredData = filteredData.map(
    country=>{
      countries.push(country.name)
      return <p key={country.name}>{country.name}</p>
    });

  if (countries.length >= 10){
    mappedFilteredData = "Too many matches, specify another filter"
  }

  return(
    <div>
      <h1>Countries</h1>
      {mappedFilteredData}
      <DisplayBasicData countries={countries}/>
    </div>
  )
}

const App = (props) => {

  const [countryList,updateList] = useState([])
  const [newFilter, setNewFilter] = useState("")

  useEffect(()=>{
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => updateList(response.data))
    },[])

  const changeFilter = (event) => setNewFilter(event.target.value);



  return (
    <div>
      <div>
        Find Countries: <input onChange={changeFilter}/>
      </div>
      <DisplayCountries countryList={countryList} newFilter={newFilter}/>
      <h2>Languages</h2>
    </div>

  )
}

export default App
