<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Editable site content lives in src/data/*; components never hardcode business info (owner edits data only).
- Booking calls go only through src/lib/booking-api.ts; empty VITE_PUBLIC_API_URL means demo mode (backend added later).
- Gallery photos are blurred by default via html[data-photos]; choice stays in localStorage only (courtesy filter, privacy).
