<?php

namespace App\Http\Controllers;
use App\Post;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;


class PostController extends Controller
{
    public function index() {
        return response()->json(Post::with('user')->get()->toArray());
    }

    public function create(Request $request){
        $inputs = [
            'text' => $request->text,
            'user_id' => $request->user_id
        ];
        if ($request->hasFile('file')) {
            $fileName = (string) Uuid::generate(4);
            $request->file('file')->storeAs(
                'public/files', $fileName
            );
            $inputs['file_path'] = 'storage/files/' . $fileName;
        }
        $post = Post::create($inputs);
        return response()->json($post->toArray()) ;
    }
}
