'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Mail, X } from 'lucide-react'

export default function Scrapbook() {
  const [vocabularyOpen, setVocabularyOpen] = useState(false)
  const [activityOpen, setActivityOpen] = useState(false)
  const [reflectionOpen, setReflectionOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])

  const photoRefs = useRef<(HTMLDivElement | null)[]>([])

  const photos = [
    { src: '/placeholder.svg?height=600&width=800', caption: 'Dublin Castle' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Bray Head' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Trinity College' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Guinness Storehouse' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Killiney Hill' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'St. Stephen\'s Green' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Bray Promenade' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Ha\'penny Bridge' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Phoenix Park' },
    { src: '/placeholder.svg?height=600&width=800', caption: 'Dalkey Island' },
  ]
  const vocabulary = [
    { word: 'Sláinte', meaning: 'Cheers' },
    { word: 'Craic', meaning: 'Fun' },
    { word: 'Go raibh maith agat', meaning: 'Thank you' },
    { word: 'Fáilte', meaning: 'Welcome' },
    { word: 'Dia duit', meaning: 'Hello' },
  ]
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = photoRefs.current.findIndex(ref => ref === entry.target)
            setVisiblePhotos(prev => [...new Set([...prev, index])])
          } else {
            const index = photoRefs.current.findIndex(ref => ref === entry.target)
            setVisiblePhotos(prev => prev.filter(i => i !== index))
          }
        })
      },
      { threshold: 0.5 }
    )

    photoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">My Dublin/Bray Scrapbook</h1>

      {/* Photo Gallery */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-gray-700">Photo Memories</h2>
        <div className="space-y-24">
          {photos.map((photo, index) => (
            <div
              key={index}
              ref={el => photoRefs.current[index] = el}
              className={`transform transition-all duration-1000 ease-in-out ${
                visiblePhotos.includes(index) 
                  ? 'translate-x-0 opacity-100' 
                  : index % 2 === 0 
                    ? '-translate-x-full opacity-0' 
                    : 'translate-x-full opacity-0'
              }`}
              style={{marginLeft: `${index * 5}%`, marginRight: `${(9 - index) * 5}%`}}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src={photo.src} 
                  alt={photo.caption} 
                  width={800} 
                  height={600} 
                  className="w-full h-auto object-cover rounded-md"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 60vw"
                />
                <p className="mt-4 text-center text-gray-600 text-lg">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Vocabulary List */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-emerald-700">Irish Vocabulary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocabulary.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-2 border-emerald-200 hover:border-emerald-400 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2 text-emerald-800">{item.word}</h3>
              <p className="text-emerald-600">{item.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Favorite Activity */}
      <section className="mb-8">
        <button
          onClick={() => setActivityOpen(!activityOpen)}
          className="w-full flex justify-between items-center bg-gray-200 text-gray-800 p-4 rounded-lg transition-colors duration-300 hover:bg-gray-300"
        >
          <span className="text-xl font-semibold">Favorite Activity</span>
          {activityOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
        </button>
        <div className={`bg-white p-4 rounded-lg shadow-lg mt-2 transition-all duration-500 ease-in-out overflow-hidden ${
          activityOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-gray-700">My favorite activity was hiking up Bray Head. The views of the Irish Sea were breathtaking, and the fresh air was invigorating. We saw so many different types of birds and plants along the way!</p>
        </div>
      </section>

      {/* Reflection */}
      <section className="mb-8">
        <button
          onClick={() => setReflectionOpen(!reflectionOpen)}
          className="w-full flex justify-between items-center bg-gray-200 text-gray-800 p-4 rounded-lg transition-colors duration-300 hover:bg-gray-300"
        >
          <span className="text-xl font-semibold">Trip Reflection</span>
          {reflectionOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
        </button>
        <div className={`bg-white p-4 rounded-lg shadow-lg mt-2 transition-all duration-500 ease-in-out overflow-hidden ${
          reflectionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-gray-700">This trip to Dublin and Bray was an unforgettable experience. I learned so much about Irish history and culture, made new friends, and created memories that will last a lifetime. The friendly people, beautiful landscapes, and rich heritage of Ireland have left a lasting impression on me.</p>
        </div>
      </section>

      {/* Letter */}
      <section className="relative">
        <button
          onClick={() => setLetterOpen(true)}
          className="w-full flex justify-center items-center bg-gray-200 text-gray-800 p-4 rounded-lg transition-colors duration-300 hover:bg-gray-300"
        >
          <Mail className="mr-2 h-6 w-6" />
          <span className="text-xl font-semibold">Open Letter</span>
        </button>
        {letterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
              <button
                onClick={() => setLetterOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Dear Future Self,</h3>
              <p className="mb-4 text-gray-700">
                Remember the amazing time you had in Dublin and Bray? The laughter shared with classmates, the awe-inspiring
                sights, and the sense of adventure that filled each day. Hold onto these memories and let them inspire you to
                keep exploring and learning about the world around you.
              </p>
              <p className="text-gray-700">
                Never forget the feeling of standing atop Bray Head, with the wind in your hair and the vast expanse of the
                Irish Sea before you. Let that moment remind you of the beauty and wonder that exists in the world, waiting
                for you to discover it.
              </p>
              <p className="mt-4 text-right text-gray-700">Fondly,<br />Your Past Self</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
