CREATE TABLE public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    business text,
    message text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view messages"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (true);