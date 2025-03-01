import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { customFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000/");

const notificationsQuery = (URL, token) => {
  return {
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await customFetch.get(URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.data) {
        throw new Error("No data received from the server");
      }
      return response.data;
    },
  };
};

function Notification() {
  const token = useSelector((state) => state.userReducer.token);
  const URL = "/Notifications/";
  const { data, isLoading, isError, refetch } = useQuery(
    notificationsQuery(URL, token)
  );

  console.log(data)

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (data) {
      setNotifications(data.notifications);
    }
  }, [data]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket");

      socket.on("notification", (notification) => {
        console.log(notification);
        alert(notification.title);
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching notifications</div>;
  }

  return (
    <div className="overflow-x-hidden">
      <Section
        description={"All the customers messages"}
        title={"Notifications"}
      />
      <Separator />
      {notifications.map((notification, index) => (
        <div key={index}>
          <div className="mt-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {notification.message}
              </p>
              <p className="text-sm text-muted-foreground">
                {notification.orderId}
              </p>
            </div>
          </div>
          <Separator />
        </div>
      ))}
      <Section
        className={"flex justify-center"}
        description={"Messages list"}
      />

      {/* <Button
        onClick={() => {
          socket.emit("notification", {
            title: "Test Notification",
            description: "This is a test notification",
          });
        }}
      >
        Say Hello
      </Button> */}
    </div>
  );
}

export default Notification;