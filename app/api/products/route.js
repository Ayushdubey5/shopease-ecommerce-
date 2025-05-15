import { productService } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await productService.getAllProducts();
    if (error) {
      return new Response(JSON.stringify({ error: error.message || error }), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await productService.createProduct(body);
    if (error) {
      return new Response(JSON.stringify({ error: error.message || error }), { status: 500 });
    }
    return new Response(JSON.stringify(data[0]), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
