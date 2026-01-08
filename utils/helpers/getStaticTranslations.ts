export async function getStaticTranslations(...paths: string[]) {
  const locale = "th"; // Default locale.

  const imports = await Promise.all(
    paths.map((path) =>
      import(`@/translations/${path}/${locale}.json`)
        .then((m) => m.default)
        .catch(() => ({})),
    ),
  );

  const messages: Record<string, any> = {};

  paths.forEach((path, idx) => {
    messages[path] = imports[idx] ?? {};
  });

  return messages;
}
