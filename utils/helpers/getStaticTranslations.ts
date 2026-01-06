const getStaticTranslations = async (
  ...paths: string[]
): Promise<Record<string, string>> => {
  const messages: Record<string, string> = {};
  const imports = await Promise.all(
    paths.map((path) =>
      import(`@/translations/${path}/th.json`)
        .then((m) => m.default)
        .catch(() => {
          /* Do nothing */
        }),
    ),
  );

  paths.forEach((path, idx) => {
    messages[path] = imports[idx] ?? {};
  });

  return messages;
};

export default getStaticTranslations;
