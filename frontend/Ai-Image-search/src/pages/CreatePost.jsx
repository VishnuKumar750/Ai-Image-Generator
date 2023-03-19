import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import { getRandomSurpriseMe } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate()
  const [ form, setForm ] = useState({
    name: '',
    prompt: '',
    photo: '',
  })

  const [ generateImage, setGenerateImage ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(form.prompt && form.photo) {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })

        const result = await res.json();
        navigate('/');
      } catch(error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please Enter your Prompt")
    }
  }

  const generateAIImage = async () => {
    if(form.prompt) {
      try {
        setGenerateImage(true);
        const res = await fetch('http://localhost:4000/api/v1/dalle/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })
        const data = await res.json();
        console.log(data);

        setForm({ ...form , photo: `data:image/jpeg;base64,${data.photo}`});


      } catch(error) {
        alert(error);
      } finally {
        setGenerateImage(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = (e) => {
    e.preventDefault();
    const randomPrompt = getRandomSurpriseMe(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <>
    {
      loading && 
      <div className={'w-full h-full absolute z-10 bg-[rgba(0,0,0,0.7)]'}>
      <div role="status" className={'flex items-center justify-center'}>
    <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-[#6469ff]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
  </div>
      </div>
    }
    <section className={'w-full sm:p-8 px-4 py-8 flex items-center flex-col justify-center'}>
      <div className={'mt-8 py-5 text-center'}>
         <h1 className={'text-2xl font-manro font-bold md:text-3xl lg:text-4xl'}>Create Your Ai Image</h1>
         <p className={'text-xl w-[15em] sm:w-[25em] font-manro md:text-2xl lg:text-3xl lg:mt-8 font-normal my-4 text-gray-400'}>The best Place to Generate Image Using Ai</p>
      </div>

      <form className={'w-[18em] xs:w-[20em] sm:w-[25em]'} onSubmit={handleSubmit}>
        <div>
          <FormField 
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Jhon Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an armchair in the shape of an avocado"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className={'mx-auto w-[15em] xs:w-[18em] sm:w-[25em]  bg-gray-50 text-gray-900 mt-8 border border-gray-300 rounded-lg text-sm p-3 flex items-center jufity-center relative'}>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className={'w-full h-full object-contain'} />
            ) : (
              <img src={preview} alt={'preview'}
                className={'w-full h-full opacity-40 object-contain'}
              />
            )}
            {generateImage && 
              <div className={'absolute inset-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]  w-full h-full'}>
                <Loader />
              </div>
            }
          </div>
          <button type="button" onClick={generateAIImage} className={'bg-green-500  mt-8 mb-4 py-4 rounded-lg mx-4 w-[13em] xs:w-[15em] sm:w-[20em] sm:mx-0 text-xl text-white font-semibold font-manro'}>
            {generateImage ? "Generating..." : "Generate"}
          </button>
          <p className={'text-gray-500 font-manro font-semibold mx-4 my-4 text-[1rem]'}>Share With Others</p>
        </div>
        <button className={"my-2 py-4 rounded-lg bg-[#8783D1] text-white w-[13em] mx-4 xs:w-[15em] sm:w-[20em] sm:mx-0 text-xl font-manro font-bold"} type='submit'>Submit</button>
      </form>
    </section>
    </>
  )
}

export default CreatePost