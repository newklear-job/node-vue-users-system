// @ts-expect-error: No ts declaration
import Toaster from "@meforma/vue-toaster/src/api";

interface Notify {
  show(message: string, options?: { [key: string]: unknown }): void;
  success(message: string, options?: { [key: string]: unknown }): void;
  error(message: string, options?: { [key: string]: unknown }): void;
  info(message: string, options?: { [key: string]: unknown }): void;
  warning(message: string, options?: { [key: string]: unknown }): void;
  clear(): void;
}
const notify = Toaster() as Notify;

export { notify };
