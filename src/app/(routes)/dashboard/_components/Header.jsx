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
import React, { useCallback, useEffect } from "react";

const Header = () => {
  const { orgId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    user && saveUserData();
  }, [user]);

  // saving user data in firebase
  const saveUserData = useCallback(async () => {
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
  }, [user]);
  return (
    <div className="flex items-center justify-between p-3 shadow-sm">
      <Logo />

      <OrganizationSwitcher
        afterCreateOrganizationUrl={"/dashboard"}
        afterLeaveOrganizationUrl={"/dashboard"}
      />

      <UserButton />
    </div>
  );
};

export default Header;
