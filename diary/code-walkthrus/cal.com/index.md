---
title: Cal.com 
dateAdded: 28-11-2023
---

## Parts

 - trpc
 - next-auth 
 - prisma 
 - zod 
 - 


## HOC's on the client side 

### [EventCollectionProvider](https://github.com/vklimontovich/next-collect)

    Telemetry. Uses a very old version of `next-collect`  and the provider is `jitsu` 

### [SessionProvider](https://next-auth.js.org/)

   Auth / Standard stuff. 

### CustomI18nextProvider

    Sets `window.document.documentElement.lang` whenever the lang locale changes for the current user via the user session. 
    Done via an `useEffect(locale)`


### TooltipProvider (radix-ui/react-tooltip)

    As per the documentation specified 
    
### CalcomThemeProvider

    Caters to `embed` and `normal` mode. Uses standard Theme provider