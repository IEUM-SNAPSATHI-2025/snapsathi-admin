import { useSignOut } from "../features/auth/hooks/useSignOut";
export default function Header({ title }) {
  const { mutate: signOut } = useSignOut();

  const handleSignOutClick = (e) => {
    e.preventDefault();
    if (confirm("정말 로그아웃하시겠습니까?")) {
      signOut();
    }
  };

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between bg-white px-10">
      <nav aria-label="현재 위치" className="flex flex-row items-center gap-2">
        <span>SNAPSATHI</span>
        <span>&gt;</span>
        <span>{title}</span>
      </nav>
      <button type="button" onClick={handleSignOutClick}>
        로그아웃
      </button>
    </header>
  );
}
