import React from 'react'

const FormField = ({ labelName, type, placeholder, name, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div className={' w-full my-4 '}>
      <div className={'flex items-center '}>
        <label className={'text-xl font-manro font-semibold  text-black py-2'}>
          {labelName}
        </label>
        {isSurpriseMe && 
        <button type='button' onClick={handleSurpriseMe} className={'text-sm font-bold font-manro py-2 px-2 rounded-lg bg-green-700 text-white mx-4'}>
          Surprise Me
        </button>
        }
      </div>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={handleChange} className={'py-3 xs:px-4 lg:py-4 lg:px-4 border my-3 px-2 outline-none bg-gray-100 text-gray-700 font-manro font-semibold rounded-lg text-xl sm:w-[20em] md:w-[27em] w-[13em] xs:w-[15em]'}/>
    </div>
  )
}

export default FormField