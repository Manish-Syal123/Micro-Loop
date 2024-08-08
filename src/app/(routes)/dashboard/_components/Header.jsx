"use client";
import Logo from "@/app/_components/Logo";
import { db } from "@/config/firebaseConfig";
import {
  OrganizationSwitcher,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";

const Header = () => {
  const { orgId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    user && saveUserData();
  }, [user]);

  // saving user data in firebase
  const saveUserData = async () => {
    const docId = user?.primaryEmailAddress?.emailAddress;
    try {
      await setDoc(doc(db, "LoopUsers", docId), {
        name: user?.fullName,
        avatar: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      console.log("Error saving user data: ", error);
    }
  };
  return (
    <div className="flex items-center justify-between p-3 shadow-sm">
      <Logo />
      {user && orgId && (
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/dashboard"}
          afterLeaveOrganizationUrl={"/dashboard"}
        />
      )}
      <UserButton />
    </div>
  );
};

export default Header;
