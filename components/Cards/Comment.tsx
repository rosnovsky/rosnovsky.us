import { PostComment } from "../..";
import { UserProfile, useUser } from "@auth0/nextjs-auth0"
import { useEffect, useState } from 'react'
import Image from 'next/image'
export default function Comment(comment: PostComment) {
  const [userProfile, setUserProfile] = useState<UserProfile>()

  useEffect(() => {
    const fetchUserProfile = async () => {
        return fetch(process.env.NODE_ENV =="production" ? `https://rosnovsky.us/api/comments/userProfile?user_id=${comment.user_id}` : `http://localhost:3000/api/comments/userProfile?user_id=${comment.user_id}`).then(result => result.json()).then((user) => setUserProfile(user.user))
    };
    fetchUserProfile();
  }, []);

  const deleteComment = () => {
    fetch(`/api/comments/updateComment`, {
      method: 'POST',
      body: JSON.stringify({
        id: comment.id, operation: 'delete'
      })
    })
    return undefined
  }

  const flagComment = () => {
    fetch(`/api/comments/updateComment`, {
      method: 'POST',
      body: JSON.stringify({
        id: comment.id, operation: 'flag'
      })
    })
    return undefined
  }

  const { user } = useUser();


  return (
    <div className="my-10">
      <div className="w-full p-3 flex items-center justify-center">
        <div className={comment.flagged ? "bg-gray-200 border border-red-800 dark:bg-gray-700  shadow-sm mx-auto px-4 py-3 rounded-lg w-full" : "bg-white dark:bg-gray-900 border shadow-sm mx-auto px-4 py-3 rounded-lg w-full"}>
          <div className="flex items-center">
            <img className="h-12 w-12 rounded-full" alt={`${userProfile?.nickname}'s avatar`} src={userProfile?.picture!} />
            <div className="ml-2">
              <div className="text-sm ">
                <span className="font-semibold">
                  {userProfile ? userProfile.nickname!.charAt(0).toUpperCase() + userProfile?.nickname?.slice(1) : "loading..."} {comment.user_id === "auth0|60f1f34374a38b006885a17d" ?
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10" className="inline">
                        <path d="M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-144.8-44.25l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.08 15.56z" className="fa-secondary" fill="green" />
                        <path d="M367.2 211.75l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.06 15.56z" fill="lightgreen" className="fa-primary" />
                      </svg>
                    </span> : null}
                </span>
                <span className="text-gray-500 dark:text-gray-700"> • {new Date(comment.published_at).toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <div className="text-gray-500 dark:text-gray-700 text-xs flex flex-row">
                <span className="inline-block">{comment.edited ?
                  <span><span className="italic">Edited</span> <svg className="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12">
                    <path d="M569.52 440L329.58 24c-18.44-32-64.69-32-83.16 0L6.48 440c-18.42 31.94 4.64 72 41.57 72h479.89c36.87 0 60.06-40 41.58-72zM288 448a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm38.24-238.41l-12.8 128A16 16 0 0 1 297.52 352h-19a16 16 0 0 1-15.92-14.41l-12.8-128A16 16 0 0 1 265.68 192h44.64a16 16 0 0 1 15.92 17.59z" className="fa-secondary" fill="orange" />
                    <path d="M310.32 192h-44.64a16 16 0 0 0-15.92 17.59l12.8 128A16 16 0 0 0 278.48 352h19a16 16 0 0 0 15.92-14.41l12.8-128A16 16 0 0 0 310.32 192zM288 384a32 32 0 1 0 32 32 32 32 0 0 0-32-32z" className="fa-primary" fill="yellow" />
                  </svg>
                  </span> : null}
                </span>
                {/* <span>{user?.sub === comment.user_id ? <span>&nbsp;•&nbsp; Edit</span> : null}</span> */}
              </div>
            </div>
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-sm mt-2 leading-normal md:leading-relaxed">{comment.comment}</p>
          <div className="text-gray-500 dark:text-gray-700 flex items-center mt-3">
            {user?.sub === comment.user_id ? <span onClick={deleteComment}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96H32zm272-288a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0z" fill="pink" /><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM128 160a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16z" fill="red" /></svg>&nbsp;&nbsp;</span> : null}
            {user?.sub !== comment.user_id ? <span>
              {
                comment.flagged 
                ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16"><path d="M512 277.9c-.16 30.35-26.16 58.1-59.55 58.1H350.72C358 364.34 384 388.13 384 430.55 384 504 336 512 312 512c-20.18 0-29.48-39.29-33.93-57.79-5.21-21.67-10.59-44.07-25.39-58.91-32.47-32.52-49.51-74-89.12-113.11a12 12 0 0 1-3.56-8.52V59.9a12 12 0 0 1 11.78-12c15.83-.29 36.7-9.08 52.66-16.17C256.19 17.6 295.71 0 344 0h2.85c42.78 0 93.36.41 113.77 29.74 8.39 12.05 10.45 27 6.15 44.63 16.31 17 25.06 48.86 16.38 74.76 17.55 23.43 19.15 56.13 9.31 79.46l.11.12C504.45 240.65 512.08 260 512 277.9z" fill="pink" /><path d="M104 32H24A24 24 0 0 0 0 56v240a24 24 0 0 0 24 24h80a24 24 0 0 0 24-24V56a24 24 0 0 0-24-24zM64 280a24 24 0 1 1 24-24 24 24 0 0 1-24 24z" fill="red" /></svg> 
                : user?.sub 
                  ? <span onClick={flagComment}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16"><path d="M512 277.9c-.16 30.35-26.16 58.1-59.55 58.1H350.72C358 364.34 384 388.13 384 430.55 384 504 336 512 312 512c-20.18 0-29.48-39.29-33.93-57.79-5.21-21.67-10.59-44.07-25.39-58.91-32.47-32.52-49.51-74-89.12-113.11a12 12 0 0 1-3.56-8.52V59.9a12 12 0 0 1 11.78-12c15.83-.29 36.7-9.08 52.66-16.17C256.19 17.6 295.71 0 344 0h2.85c42.78 0 93.36.41 113.77 29.74 8.39 12.05 10.45 27 6.15 44.63 16.31 17 25.06 48.86 16.38 74.76 17.55 23.43 19.15 56.13 9.31 79.46l.11.12C504.45 240.65 512.08 260 512 277.9z" fill="gray" /><path d="M104 32H24A24 24 0 0 0 0 56v240a24 24 0 0 0 24 24h80a24 24 0 0 0 24-24V56a24 24 0 0 0-24-24zM64 280a24 24 0 1 1 24-24 24 24 0 0 1-24 24z" fill="lightgray" /></svg></span> 
                : null}</span> 
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}
