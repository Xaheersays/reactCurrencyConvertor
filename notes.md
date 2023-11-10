### most important 
- when we use useCallback to stop rerendering of child if parent rerenders


In a React application, the initial render is the first time that the component tree is rendered to the DOM. It happens when the application first loads, or when the root component is first rendered. This is also known as "mounting" the components.

Re-renders, on the other hand, happen when the component's state or props change, and the component needs to be updated in the DOM to reflect these changes. React uses a virtual DOM to optimize the process of updating the actual DOM, so that only the necessary changes are made.

There are a few ways that you can trigger a re-render in a React component:

By changing the component's state or props. When the component's state or props change, React will re-render the component to reflect these changes.

When the parent element re-renders, even if the component's state or props have not changed.


### General Rules of Hooks & take aways 
starts with "use" (both -react and custom hooks)
component must be uppercase
invoke inside function/component body
don't call hooks conditionally (cover later)=> making hook inside a if block
set functions don't update state immediately (cover later)=> they are asynchronous 
-so when u immediately console it,it displays old data only becoz of its asynchronous nature...
-which means that we use useEffect hook to get the updated values 
-remember the batch updates which helps to optimize(re-rendering only single time)


### jsx tips
- i cant directly show objects {id:1,name:"a"} directly on browser but i can directly display arrays/string so oftenly we use obj.map()

```js
03-useState-array.jsx?t=1699252853992:23 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `UseStateArray`. See https://reactjs.org/link/warning-keys for more information.
```
this shit happens becoz we must have a key(unique) associated with each object react uses them for optimization
optimization-->? react while reconcilation uses this key to check if thats present or not ,if not then updates dom

# imp note
-the data flows from Parent Component to Child Component pretty much js Lexical Scoping comes into the picture 
-we can pass data from one paren comp  to its child but cant do vice versa

# conditional rendering
```jsx
function f(){
    let boolean = true;
    return(                                             
        {boolean && <Component/>} evaluates to if boolean(which is true) we go to other condtion which directly renders the Component
    )
}
```

## useEffect(callBack,[])
when this depencdency empty array is passed it means to  run useEffect only of first render and since there are no dependencies so none of states variables affects it
-to be specific empty array means when our component is mounted and unmounted  which include(reloading page )
## useEffect(callBack)
- this means to run useEffect on every mount( initail render ),change of props 

## useEffect
we can pass props also 
-when we had some dependency in array it means run it on mount unmount and change in dependency(which is not the case here)

## useEffect memory leaks
```jsx
import React, {useState, useEffect} from 'react';
const Timer = (props) => {
    const {customText} = props
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("I am running setInterval")
            setCounter((prevCounter) => prevCounter + 1)
        }, 1000)
        console.log("creater interval with id ", interval)
        // clean up
        return () => {
            console.log("i was unmounted")
            console.log("removing interval with id ", interval)
            clearInterval(interval)
        }

    }, [])

    useEffect(() => {
        // clean up

        return () => {
            console.log("cleaning up 2nd effect for customText")
        }
    }, [customText])

    useEffect(() => {
        console.log("i am rendering again and again")
        // clean up

        return () => {
            console.log("cleaning up 3rd effect for customText")
        }
    })
    return <>
    <span>Current time is: {counter}</span>
    <br/>
    <span>{customText}</span>
    <br/>
    {/* <button onClick={startTimer}>Start Timer</button> */}
    </>
}
```
# blog to understand the cleanup fucntion [hhttps://medium.com/@vishalkalia.er/what-is-the-useeffect-cleanup-function-and-how-it-works-83d8c67a1a10]

# writing cleanup function in useEffect
```jsx

useEffect(() => {
  getUser(userId).then((user) => {
    setUser(user)
  })

  // Cleanup Function: Called when we unmount or dependency changes
  return () => {}
}, [userId])

```
### vvvimp tip
whenever we unmount or props/dependency changes  we get a chance to execute return statement, we can do any thing here so 
especially we use cleanup functions
when the component unmounts from other components or anywhere the return statement inside <b> all of the useState present inside removed Component </b> gets executed wheather the useEffect has dependecy of empty array [] or no dependecy

```jsx

const [win,setWin] = useState(window.screen.width)
const setWindowWidth =( )=>{
    setWin(window.innerWidth);
}

useEffect(() => {
    window.addEventListener('resize',setWindowWidth)
  return () => {
        window.removeEventListener('resize',setWindowWidth)
})

this is best example [remember the steps]
see the steps:
1) first time the component rendered(mounted) which fires useEffect
2) inside it we add eventListener to window
3) now the event is handled by `setWindowWidth` which does setWin(window.innerWidth); sets width asynchronously 
    (dont know how much time  does it takes)
4) this above part is now completed 
5) now the component rerenders since we had updated the value of state [win]
6) now we havent passed any array which causes useEffect to run on every render 
7) and we know that useEffect's return statements are executed when the dependencies changes or when component unmounts 
8) so this clean up causes remove of the event which saves memory leaks or wastage of memory
9) since now component has rendered the useEffect has once again added an event to window
```


## useRef  hook  
```jsx
const App = () => {
    let myLocal = 0
    console.log("myLocal", myLocal)
    const ref = useRef(0)
    const [myCount, setCount] = useState(0)
    console.log("ref.current", ref.current)

    const inputRef = useRef(null)

    return <>
    <button onClick={() => {myLocal+= 1}}>Change local variable</button>
      <button onClick={() => {ref.current += 1}}>Change ref</button>
      <button onClick={() => {setCount((prevCount) => prevCount + 1)}}>Change state</button>

      <div>
        <span>Local var: {myLocal}</span><br/>
        <span>ref: {ref.current}</span><br/>
        <span>state variable: {myCount}</span><br/>
      </div>
      </>
}
```

- useRef doesnt even render something but it preserves value between previous render and next render
- changeing ref doesnt causes render but the changes are also updated when component renders 
- ref.current gives u current value of the thing on which we have defined the ref
  this way we reference it <span>ref: {ref.current}</span><br/>
- which is different from local variables from resetting the value after render 
- we use useRef also for manipulating the content of web page

# useRef on Timer example when we dont unmount
```jsx
    const [counter,setCounter] = useState(0)
    const interval = useRef(null)
    useEffect(() => {
        interval.current = setInterval(()=>{
            console.log("i am running")
            setCounter(p=>p+1)
            
        },1000)
        return ()={clearInterval(interva.current)}
    },[])

    const stopTimer = () => {
        console.log("stopping timer for id ", interval.current)
        clearInterval(interval.current)
    }

```
why cant we do 
```jsx
let interval ;
useEffect(() => {
    interval = setInterval(()=>{
        console.log("i am running")
        setCounter(p=>p+1)

    },1000)
    return ()={clearInterval(interva.current)}
},[])

const stopTimer = () => {
    console.log("stopping timer for id ", interval)
    clearInterval(interval)
}
```
- naah we cant do like above becoz inside useEffect we are having setCounter which causes rerender after every second
- which on render sets `interval` to again undefined before clicking stop timer button;

why first one runs?
- we has reference of interval even if the component is rendering every second
- when we click the stop timer we has refernce of `interval` inside `interval` obj as `interval.current` which useRef has helped to vanish again and again on every render


# useRef used for manipulation 
```jsx
cont SomeComp = ()=>{
    ref = useRef(null)
    return(
        <>
        <Input ref={ref} data={p:"x"} />
        </>
    )
}
here the above ref is recived from forwardref and we gets props too
import React, {forwardRef } from 'react';
const Input = forwardRef((props, ref) => {
    console.log("input box props are: ", props)
    return <input ref={ref} type="text"/>
})

export default Input

```


## when does a function changes if it's previous memory location isnt same as current memory location

### useCallback hook
- caches function defination which means that prevents recreating the function in memory 


```jsx
app.jsx

import { useState } from 'react'
import './App.css'
import Second from './Second.jsx'

function App() {
  const [count, setCount] = useState(0)
  const firstCount=()=>{
    console.log('into the first comp incrementing')
    setCount(prev=>prev+1)
  }

  return (
    <>
    <div   className='flex  flex-col justify-center items-center gap-4 pt-5'>
      <div className='flex  justify-center items-center gap-4 pt-5'>
        <p>i am first and count is :<span className="bg-green-300 p-2 text-black">{count}</span></p>
        <button onClick={firstCount} className='bg-sky-500 p-4 rounded-lg'>first Comp Count++</button>
        </div>
        <div>
        <br />
        <Second/>
      </div>
    </div>
    </>
  )
}

export default App

```

```jsx
import { memo ,useCallback} from 'react'
import Thrid from './Third'
const Second =  ()=> {
    const handleClick = useCallback(()=>{
        console.log(handleClick)
    },[])
    return <>
    <p>here is your second component </p>
    <Thrid handleClick={handleClick}/>
    </>
}
export default Second
```
```jsx
import { memo, useState } from "react";

const Thrid = memo((props)=>{
    let  {handleClick} =  props;
    const [count,setCount] = useState(0);
    let startTime = performance.now() 
    while(performance.now()-startTime<800){}

    const increment = ()=>{
        
        setCount((prev)=>prev+1)
        handleClick?.()
    }
    return (
        <>
            <p>i am super slow third comp</p>
            <br />
            <p>third comp count : <span className="bg-green-300 p-2 text-black">{count}</span> </p>
            <button onClick={increment} className="bg-sky-500 p-4 rounded-lg" >third comp count ++</button>
        </>
    )

})
export default Thrid
```

- over here
 ```jsx
    const handleClick = useCallback(()=>{
        console.log(handleClick)
    },[])
```
- here now even every thing rerender   `handleClick` has callback so which has empty array means dont render or dont crete yourself unless dependencies changes (which here is `[]`)
- so now there is nothing that which can create a new   `handleClick` function in memory 

```jsx
    const Thrid = memo((props)=>{
        let  {handleClick} =  props;
        const [count,setCount] = useState(0);
        let startTime = performance.now() 
        while(performance.now()-startTime<800){}
    }
```
- here now nothing changes in props to so that memo recives same address /reference of `handleClick` function
    and no new rendering happens when we render second/first component
- in depedencies we oftenly passes reactive variables such as `(props,state,functions)`
``` jsx
const memoizedCallback = useCallback(() => {
    console.log('Callback invoked');
  });
```
- if we didnt pass any array then it means to run it on every rerender



##  useMemo hook
- useMemo hook is like dp caching 
- when props/parameters/ rather  dependecies change the part is calculated again
- needs dependecies 
```jsx
import React, { useMemo } from 'react';

const MyComponent = ({ data }) => {
  const processedData = useMemo(() => {
    // perform some expensive computation using 'data'
    return result;
  }, [data]);

  // component logic using processedData
};

```


## memo is api
- memo is a higher-order component provided by React. It is used to memoize the rendering of a functional component. When a component is wrapped with memo, it will only re-render if its props have changed.
- changes when props are changed

```jsx
import React, { memo } from 'react';

const MyComponent = memo(({ propA, propB }) => {
  // component logic
});

export default MyComponent;
```

# careful when memo uses   `Object.is()` under hood
- when we had added memo() to some component and that recieves props 
- if the props are of primitive datatype eg.`[string,number,bigint,boolean,undefined,symbol,null]` the memo will consider it same when the value of the before prop and after prop are same 
    ofcourse if values are different it will not consider them same
- but if the props were of some object like array,Object etc ,even if they havent got changed the memo will conider them as different 
    which causes unneccesary rendering be aware of this behaviour
- react doc says it uses `Object.is()`  which works like
```js
console.log(Object.is('1', 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj = {};
console.log(Object.is(obj, {}));
// Expected output: false

```
- we can use custom Comparator function to compare
```jsx
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    // oldProps.dataPoints.length === newProps.dataPoints.length &&
    // oldProps.dataPoints.every((oldPoint, index) => {
    //   const newPoint = newProps.dataPoints[index];
    //   return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    return true when same else return false
    })
  );
}
```
## Solution
- so we use useMemo at objects with empty array
```jsx
function Page() {
    const [name, setName] = useState('Taylor');
    const [age, setAge] = useState(42);

    const person = useMemo(
        () => ({ name, age }),
        [name, age]
    );

    return <Profile person={person} />;
    }

const Profile = memo(function Profile({ person }) {
  // ...
});
```
```jsx
    const myObj = useMemo(() => {channel: "JS Cafe"}, [])
    const arr = useMemo(() => (['a', 'b']), [])
    const val = 10
    now prop it as props 
```



## Lazy component 

```jsx
import React, { lazy, Suspense } from 'react';
const Text = lazy(() => delayForDemo(import('./Text.js')));
function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }
function Component() {
        const [showText, toggleText] = useState(false);
        return (
            <>
            {showText && <Suspense fallback={<div>I am loading</div>}>
            <Text>Hello guys!</Text>
            </Suspense>}
            </>
        )

}
```
- see when we import something the file is loaded into bundle.js 
- what is bundle.js at production/running react takes all files compiles it to one .js(bundle.js) file 
- so its always not a good idea to import all the files at first render
- so we use `Lazy()` component provided by react
- what lazy does is it :
    - it doesnt include/load that imported file into bundle.js
    - and on demand of client it it shows some fallback component or loading screen
    - it does the above step only for once and hence after it is always available

- `const Text = lazy(() => delayForDemo(import('./Text.js')));` this is how we import
```jsx
            <Suspense fallback={<div>I am loading</div>}>
            <Text>Hello guys!</Text>
            </Suspense>}
```
- Suspense componet is also provided by react 
- `fallback={<div>I am loading</div>}`here we can show some other component 
    eg =   `fallback=<ShowSomeOtherComponent/>`
