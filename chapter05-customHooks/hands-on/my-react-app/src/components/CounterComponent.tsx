import useCounter from "../hooks/useCounter";

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <h2>Counter</h2>
      <p>Current Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterComponent;
