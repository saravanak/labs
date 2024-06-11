const scriptId = Deno.args[0] /* `scriptId=b` */.split("=")[1];
const scriptPath = Deno.args[1] /* `scriptPath=/a/b.ts` */.split("=")[1];
const scriptProxy = "http://localhost:3001/proxy";
const scriptAuthHeaders = {
  "x-script-id": scriptId,
};

const realFetch = fetch;

// User fetch (all requests pass through, and are limited by, the proxy)
// n.b. there's no way around this – all other hosts are locked down via `--allow-net`
// e.g. `realFetch("https://bing.com")` will cause the sandbox to crash with `PermissionDenied`
globalThis.fetch = (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => {
  if (init === undefined) {
    init = {};
  }

  init.headers = {
    ...init.headers,
    ...scriptAuthHeaders,
    "x-script-fetch": input.toString(),
  };
  return realFetch(scriptProxy, init);
};

try {
  // Here's where we run user code
  const {logic} = await import(scriptPath);

  const bitmap = Array(100).fill(0)
  .map((v,i) => {
    return logic(Math.floor(i/10), i%10)
  }).map(v => {
    switch (v) {
      case "blue": 
        return "B";
      case "black": 
        return "b";
    }
  })
  .reduce( ({rle, streakChar, runningLength}:any,v, index ) => {

    if(streakChar == null) {
      return {
        rle, 
        streakChar: v , 
        runningLength: 1
      }
    }
    if(streakChar == v) {
      if(index== 100-1) {
        return {
          rle: rle+`${streakChar}${runningLength}`, 
          streakChar: v , 
          runningLength: 1
        }
      } else {
        return {
          rle, 
          streakChar , 
          runningLength: runningLength+1
        }
      }
      
    }
    
    return {
      rle: rle+`${streakChar}${runningLength}`, 
      streakChar: v , 
      runningLength: 1
    }

  }, {
    rle: "",
    streakChar: null, 
    runningLength: 0
  })

  console.log(JSON.stringify(bitmap))
} catch (e) {
  console.error(e);
}
