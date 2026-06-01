import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export async function updateSearchCount(searchTerm, movie) {
  const normalizedTerm = searchTerm.toLowerCase().trim();

  try {
    // 1. Check if search term already exists
    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .eq("search_term", normalizedTerm)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    // 2. If it exists, increment the count
    if (data) {
      await supabase
        .from("metrics")
        .update({ count: data.count + 1 })
        .eq("id", data.id);

      // 3. if it doesn't exist, create a new row
    } else {
      await supabase.from("metrics").insert({
        search_term: normalizedTerm,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        count: 1,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getTrendingMovies() {
  try {
    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .order("count", { ascending: false })
      .limit(5);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
  }
}
