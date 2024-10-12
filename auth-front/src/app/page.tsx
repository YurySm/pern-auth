'use client';
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/store/hooks";
import {useEffect, useState} from "react";
import {IUser} from "@/interfaces/user.interface";
import {userService} from "@/services/user.service";
import Button from "@/components/UI/button/Button";
import Image from "next/image";
import Loader from "@/components/UI/loader/Loader";

export default function Home() {
  const {user} = useAuth()
  const {logout} = useActions()

  const [profile, setProfile] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const response = await userService.getProfile()
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false)
    };

    user && fetchProfile();

  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {isLoading && <Loader/>}
      {
        profile &&
          <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-200 p-4">
              <Image
                  className="rounded-full mx-auto"
                  width={100}
                  height={100}
                  src={profile.avatarPath}
                  alt={`${profile.name}'s avatar`}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-black text-center">{profile.name}</h2>
              <p className="text-black text-center mt-2">{profile.email}</p>
              <p className="text-black text-center mt-1">{profile.phone}</p>
            </div>
          </div>
      }
      {
        !!user &&
          <Button
              type={'submit'}
              variant={'orange'}
              onClick={() => logout()}>Logout
          </Button>
      }
    </div>
  );
}
