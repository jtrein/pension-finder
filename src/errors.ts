export class AppError extends Error {
  constructor(public details: { status: number; message: string }) {
    super(details.message);

    this.name = "AppError";
  }
}
