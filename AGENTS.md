<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Application architecture
- Keep the shared editorial shell and repeatable sourcing sections in `src/components/sorsme.tsx`, with content pages as TanStack leaf routes, so navigation and presentation remain consistent.
- Keep category, product examples, pricing and quotation limits in `src/lib/sorsme.ts` and test business rules separately from presentation to prevent inconsistent fees.
- Until live services are connected, request forms export a local draft and never claim submission, payment, sign-in or tracking succeeded; this avoids false backend functionality.
- Admin lives under `/admin/*` routes with its own shell (`src/components/admin/`); the root layout skips the public header/footer there so the two experiences stay independent.
- Admin rules (visibility, status, subscription access, form validation) live in `src/lib/admin.ts` with tests in `src/test/admin-rules.test.ts`; screens never invent records and show "not connected" states until a backend exists.
