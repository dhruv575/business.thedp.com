import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-NCT8XF7JMB"
    ></script>,
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NCT8XF7JMB');
        `,
      }}
    ></script>,
  ]);
};
