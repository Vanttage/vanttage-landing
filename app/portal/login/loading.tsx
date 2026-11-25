/* El login es una página cliente ligera: sin esqueleto con menú lateral */
export default function LoginLoading() {
  return <div className="min-h-[100dvh] bg-[var(--pbg)]" aria-busy="true" />;
}
