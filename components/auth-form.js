export default function AuthForm({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>Email
        <input
          name='email'
          type='email'
          value={email}
          placeholder='Email'
          onChange={onEmailChange}
        />
      </label>

      <label>Password
        <input
          name='password'
          type='password'
          value={password}
          placeholder='Password'
          onChange={onPasswordChange}
        />
      </label>

      <button type='submit'>Submit</button>
    </form>
  )
}
