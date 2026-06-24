export default function Login() {
  const loginWithGoogle = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}