import React, { useState } from 'react'
import { useEffect } from 'react'
import { Loader, FormField, Card } from '../components'
import FuzzySet from 'fuzzyset'

// Rendering Cards
const RenderCards = ({ data, title }) => {
  // console.log(data);
  if(data?.length > 0) {
    return data.map((posts) => (
      <Card key={posts._id}{...posts} />
    ))
  }

  return (
    <h1 className='text-xl text-center font-bold font-manro mt-4 lg:text-2xl mb-16 w-[15em]'>{title}</h1>
  )
}

const Home = () => {
  const [ loading, setLoading ] = useState(false);
  const [ allPosts, setAllPosts ] = useState(null);
  const [ searchText, setSearchText ] = useState('')
  const [ searchedResults, setSearchedResults ] = useState(null);
  const [searchTimeout, setSearchTimeout ] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        // console.log(await res.json());

        if(res.ok) {
          const result = await res.json();
          // console.log(result);
          setAllPosts(result.data.reverse());
        }

        console.log(allPosts);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  },[])

  const handleChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        
        const searchResults = allPosts.filter((item) => item.name.includes(searchText) || item.prompt.toLowerCase().includes(searchText.toLowerCase())  ) 
  
        setSearchedResults(searchResults);
      }, 500)
    )
  }

  return (
    <section className={'w-full sm:p-8 px-4 py-8 flex flex-col  items-center justify-center'}>
      <div className={'w-[15em] sm:w-[20em] md:w-[34em] lg:w-[41em] mt-8 py-5 text-center'}>
         <h1 className={'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-manro font-bold'}>Image Generator</h1>
         <p className={'text-xl sm:text-2xl sm:w-[13em] md:text-3xl lg:text-4xl md:w-[18em] font-manro font-normal my-4 text-gray-400 lg:mt-9'}>The best Place to Generate Image Using Ai</p>
      </div>

      <div className='mt-16 w-[16em] xs:w-[19em] sm:w-[24em] md:w-[30em]'>
        <FormField 
          labelName={'Search posts'}
          name={'text'}
          type={'text'}
          placeholder={'car'}
          value={searchText}
          handleChange={handleChange}
        />
      </div>

      <div className={'mt-10 '}>
        { loading ? (
          <div className={'flex items-center justify-center'}>
            <Loader />
          </div>
        ) : (
          <>
          { searchText && (
            <div className={'font-manro mb-8 font-medium text-xl text-slate-400'}>Showing results for <span className={'text-slate-500'}>{searchText}</span> </div>
          )}

          <div className={'grid gap-3 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1'}>
            { searchText ? (
              <RenderCards 
                data={searchedResults}
                title="No Search result found"
              />
            ) :
            (
              <RenderCards
                data={allPosts}
                title="No posts found"
              />
            )
            }
          </div>
          </>
        )
      }
      </div>
    </section>
  )
}

export default Home