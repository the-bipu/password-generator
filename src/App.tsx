import { Component, createSignal } from 'solid-js';

const App: Component = () => {
  const [size, setSize] = createSignal(10);
  const [password, setPassword] = createSignal('');

  const [isUpperOn, setIsUpperOn] = createSignal(true);
  const [isLowerOn, setIsLowerOn] = createSignal(true);
  const [isDigitOn, setIsDigitOn] = createSignal(true);
  const [isSpecialOn, setIsSpecialOn] = createSignal(true);

  const charPools = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    digits: '0123456789',
    special: '!@#$%^&*()-_=+[]{}|;:,.<>?/~`',
  };

  const generatePassword = () => {
    const pool = [
      isUpperOn() && charPools.upper,
      isLowerOn() && charPools.lower,
      isDigitOn() && charPools.digits,
      isSpecialOn() && charPools.special,
    ]
      .filter(Boolean)
      .join('');

    if (!pool) {
      setPassword('Select at least one option');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < size(); i++) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      newPassword += pool[randomIndex];
    }
    setPassword(scrambleString(newPassword));
  };

  const scrambleString = (str: string) =>
    str.split('').sort(() => Math.random() - 0.5).join('');

  const toggleOption = (setter: (value: boolean) => void, current: boolean) => {
    setter(!current);
    generatePassword();
  };

  const changeSize = (delta: number) => {
    setSize(Math.max(1, size() + delta));
    generatePassword();
  };

  const sliderSize = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setSize(parseInt(target.value, 10));
    generatePassword();
  };
  

  generatePassword();

  return (
    <div class="flex flex-col w-full min-h-screen items-center justify-center py-8">
      <h1 class="text-6xl font-bold mb-4">Random Password Generator</h1>
      <div class='text-xl font-light mb-8'>Create strong and secure passwords to keep your account safe online.</div>

      <div class='flex flex-row gap-4'>
        <div class="mb-4 pl-10 py-2 border border-[#acacac] flex flex-row gap-5 rounded-full inner-shadow">
          <div class='text-2xl font-mono pr-4'>
            {password()}
          </div>
          <div class='bg-orange-400 text-white px-5 mr-3 text-lg flex items-center justify-center rounded-full'>
            <button class='uppercase'>strong</button>
          </div>
        </div>

        <button class='px-6 h-12 text-white font-bold uppercase bg-blue-500 shadow rounded-full'>Copy</button>
      </div>

      <div class='mt-6 mb-4 font-semibold text-xl'>🐦‍🔥 Password Length 🐦‍🔥</div>
      <div class="flex gap-2 mb-4 items-center justify-center">
        <button class='text-3xl font-bold w-12 h-12 pb-2 flex items-center justify-center rounded-full border border-[#acacac]' onClick={() => changeSize(-1)}>
          -
        </button>
        <input type="range" min="1" max="40" value={size()} class="w-64 h-4 border border-[#acacac] rounded-full" id="myRange" onInput={sliderSize} />
        <button class='text-3xl font-bold w-12 h-12 pb-2 flex items-center justify-center rounded-full border border-[#acacac]' onClick={() => changeSize(1)}>
          +
        </button>
      </div>

      <div class='mt-6 mb-4 font-semibold text-xl'>🐦‍🔥 Characters Used 🐦‍🔥</div>
      <div class="flex gap-6">
        <Checkbox label="ABC" checked={isUpperOn()} onChange={() => toggleOption(setIsUpperOn, isUpperOn())} />
        <Checkbox label="abc" checked={isLowerOn()} onChange={() => toggleOption(setIsLowerOn, isLowerOn())} />
        <Checkbox label="123" checked={isDigitOn()} onChange={() => toggleOption(setIsDigitOn, isDigitOn())} />
        <Checkbox label="#$&" checked={isSpecialOn()} onChange={() => toggleOption(setIsSpecialOn, isSpecialOn())} />
      </div>
    </div>
  );
};

const Checkbox = (props: { label: string; checked: boolean; onChange: () => void }) => (
  <label class="flex gap-2 justify-center font-mono items-center font-medium text-xl">
    <input type="checkbox" class={`w-6 h-6 ${!props.checked && 'inner-shadow'}`} checked={props.checked} onChange={props.onChange} />
    {props.label}
  </label>
);

export default App;
