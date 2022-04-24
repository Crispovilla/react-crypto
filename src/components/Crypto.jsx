
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Crypto = () => {

    const [ search, setSearch ] = useState( "" );
    const [ cryptos, setCryptos ] = useState( [] );

    const endpoint = 'https://api.coingecko.com/api/v3/coins'

    const showData = () => {
         axios.get(endpoint).then (( res ) =>{
             console.log(res.data)
             setCryptos(res.data)
         })
    }

    useEffect( () =>{
        showData()

    }, [] )

    const searcher = (e) => {
        setSearch(e.target.value);
    }

    const results = !search ? cryptos : cryptos.filter((val) => val.name.toLowerCase().includes(search.toLowerCase()))





  return (
    <>
    
        <input 
        type="text"
        value={search}
        onChange={searcher}
        placeholder='Search...'
        className='form-control'
         />
         <table className='table table-dark table-hover mt-3'>
             <thead>
                 <tr>
                     <th>Ranking</th>
                     <th>Name</th>
                     <th>Symbol</th>
                     <th>Price</th>
                     <th>High Price 24h</th>
                     
                 </tr>
             </thead>

             <tbody>
                 {
                     results.map((result)=>(
                        <tr key={result.id}>
                            <td>{result.market_data.market_cap_rank}</td>
                            <td> <img src={result.image.thumb} alt="" /> {result.name}</td>
                            <td>{result.symbol.toUpperCase()}</td>
                            <td>{result.market_data.current_price.clp.toFixed(0) +' CLP'}</td>
                            <td>
                                {result.market_data.price_change_percentage_24h < 0 ? (
                                    <span className='badge bg-danger'>{result.market_data.price_change_percentage_24h}</span>
                                ):(
                                    <span className='badge bg-success'>{result.market_data.price_change_percentage_24h}</span>

                                )}
                            </td>
                           

                        </tr>
                     ))

                 }
             </tbody>

         </table>
    </>
  )
}

export default Crypto