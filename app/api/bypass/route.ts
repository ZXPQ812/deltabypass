import { NextResponse } from 'next/server';

// Safe placeholder: implement only an authorized integration that respects
// the target service's access controls and terms of service.
export async function POST() {
  return NextResponse.json(
    { error: 'Bypass endpoint is not included in this starter template.' },
    { status: 501 }
  );
}
