export function navigateToParentRoute({ pathname, router }: any) {
  const previousPath = pathname.split('/').slice(0, -1).join('/');

  router.push(`${previousPath}`);
  router.refresh();
}
