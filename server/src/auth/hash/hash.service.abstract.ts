export abstract class HashServiceAbstract {
  abstract compare(password: string, hash: string): Promise<boolean>;
  abstract hash(password: string): string;
}
