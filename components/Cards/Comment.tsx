import { PostComment } from "../..";
import {UserProfile, useUser} from "@auth0/nextjs-auth0"
import { useEffect, useState } from 'react'

export default function Comment(comment: PostComment) {
  const [userProfile, setUserProfile] = useState<UserProfile>()

  useEffect(() => {
    const fetchUserProfile = async () => {
      return fetch(`http://localhost:3000/api/comments/userProfile?user_id=${comment.user_id}`).then(result => result.json()).then((user) => setUserProfile(user.user))
    };
    fetchUserProfile();
  }, []);

  const { user } = useUser();
  
  
  return (
    <div className="my-10">
      <div className="w-full p-3 flex items-center justify-center">
        <div className={comment.flagged ? "bg-red-100 border border-red-800 shadow-sm mx-auto px-4 py-3 rounded-lg w-full" : "bg-white border shadow-sm mx-auto px-4 py-3 rounded-lg w-full"}>
          <div className="flex items-center">
            <img className="h-12 w-12 rounded-full" src={userProfile?.picture!}/>
            <div className="ml-2">
              <div className="text-sm ">
                <span className="font-semibold">
                  {userProfile ? userProfile.nickname!.charAt(0).toUpperCase() + userProfile?.nickname?.slice(1) : "loading..."} {comment.user_id === "auth0|60f1f34374a38b006885a17d" ? 
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="10" className="inline">
                      <path d="M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-144.8-44.25l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.08 15.56z" className="fa-secondary" fill="green" />
                      <path d="M367.2 211.75l-131 130a11 11 0 0 1-15.55-.06l-75.72-76.33a11 11 0 0 1 .06-15.56L171 224a11 11 0 0 1 15.56.06l42.15 42.49 97.2-96.42a11 11 0 0 1 15.55.06l25.82 26a11 11 0 0 1-.06 15.56z" fill="lightgreen" className="fa-primary"/>
                    </svg>
                  </span>: null}
                </span>
                <span className="text-gray-500"> • {new Date(comment.published_at).toLocaleString('en-US', {day: "numeric", month:"long", year: "numeric"})}</span>
              </div>
              <div className="text-gray-500 text-xs flex flex-row">
              <span className="inline-block">{comment.edited ? 
                    <span><span className="italic">Edited</span> <svg className="inline"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="12">
                        <path d="M569.52 440L329.58 24c-18.44-32-64.69-32-83.16 0L6.48 440c-18.42 31.94 4.64 72 41.57 72h479.89c36.87 0 60.06-40 41.58-72zM288 448a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm38.24-238.41l-12.8 128A16 16 0 0 1 297.52 352h-19a16 16 0 0 1-15.92-14.41l-12.8-128A16 16 0 0 1 265.68 192h44.64a16 16 0 0 1 15.92 17.59z" className="fa-secondary" fill="orange" />
                        <path d="M310.32 192h-44.64a16 16 0 0 0-15.92 17.59l12.8 128A16 16 0 0 0 278.48 352h19a16 16 0 0 0 15.92-14.41l12.8-128A16 16 0 0 0 310.32 192zM288 384a32 32 0 1 0 32 32 32 32 0 0 0-32-32z" className="fa-primary" fill="yellow"/>
                      </svg>
                    </span> : null}
                  </span><span>{user?.sub === comment.user_id ? <span>&nbsp;•&nbsp; Edit</span> : null}</span> 
              </div>
            </div>
            </div>
          <p className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">{comment.comment}</p>
          <div className="text-gray-500 text-xs flex items-center mt-3">
          {user?.sub === comment.user_id ? <div>Delete&nbsp;</div> : null}
          <div> {comment.flagged ? <span className="font-bold text-red-900">Reported</span> : "Report"}</div>
        </div>
      </div>
    </div>
  </div>
  )
}
