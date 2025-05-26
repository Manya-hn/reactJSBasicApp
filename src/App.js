import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [apiData, setAPIData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchData = () => {
    setLoader(true)
    axios
      .get('https://dummyjson.com/products')
      .then((res) => {
        console.log(res);
        setAPIData(res?.data?.products);
        setLoader(false)
      })
      .catch((err) => {
        console.log(err);
        setLoader(false)
      });
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <h1 className='title-container'>
        Hello Valuelabs!
      </h1>
      {
        loader ? 
        <div className="loader-container">
          <div className="loader" />
        </div> :
          <div>
            <div className='main-container'>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    apiData?.map(item => {
                      return (<tr>
                        <td>
                          {
                            item?.title
                          }
                        </td>
                        <td>
                          {
                            item?.description
                          }
                        </td>
                        <td>
                          <img src={item?.images} alt={item?.name} width="100" />
                        </td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
      }
    </div>
  );
}
