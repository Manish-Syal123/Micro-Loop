import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
  useUpdateRoomNotificationSettings,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

const NotificationBox = ({ children }) => {
  const { inboxNotifications } = useInboxNotifications();
  const updateRoomNotificationSettings = useUpdateRoomNotificationSettings();
  const { count, error, isLoading } = useUnreadInboxNotificationsCount();

  useEffect(() => {
    //if someone replies to your comment, then u will be notified but if you want for every comment you want notification then u use updateRoomNotificationSettings({threads:'all'})
    updateRoomNotificationSettings({ threads: "all" }); // you can comment this line if u don't want notification for every comment
    console.log(count);
  }, [count]);
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-1">
          {children}{" "}
          <span className="p-1 px-2 -ml-3 rounded-full text-[7px] bg-primary text-white">
            {count}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className={"w-[500px]"}>
        <InboxNotificationList>
          {inboxNotifications.map((inboxNotification) => (
            <InboxNotification
              key={inboxNotification.id}
              inboxNotification={inboxNotification}
            />
          ))}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBox;
