<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Story\StoreStoryRequest;
use Illuminate\Support\Facades\DB;

use App\Models\Story;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $stories = DB::table('stories')
                ->join('users', 'stories.user_id', '=', 'users.id')
                ->select('stories.*', 'users.email as email')
                ->get();

            return $stories;
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An error occurred while retrieving the stories. Please try again later.']);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // return view('stories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStoryRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $user_id = Auth()->user()->id;
            $user_role = Auth()->user()->role;
            $validatedData['user_id'] = $user_id;

            Story::create($validatedData);

            // return redirect()->route($user_role.'.stories');
            return response()->json(['status' => 'success','message'=>'successfully added'], 200);
        } catch (\Exception $e) {
            return back()->withInput()->withErrors(['error' => 'An error occurred while creating the story. Please try again later.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $story = Story::findOrFail($id);

        // return view('stories.edit', compact('story'));
        return redirect()->route('stories.index');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreStoryRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();
            $user_id = Auth()->user()->id;
            $user_role = Auth()->user()->role;
            $validatedData['user_id'] = $user_id;

            $story = Story::findOrFail($id);
            try {
                $story = Story::findOrFail($id);
            } catch (ModelNotFoundException $ex) {
                return response()->json(['error' => 'Story not found.'], 404);
            }

            if($user_role !== 'admin' && $story['user_id'] !== $user_id)
                return response()->json([
                    'message' => 'You can\'t update this story'
                ], 201);

            $story->update($validatedData);

            return response()->json(['status' => 'success','message'=>'successfully edited'], 200);
        } catch (\Exception $ex) {
            return back()->withInput()->withErrors(['error' => 'An error occurred while updating the story. Please try again later.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user_id = Auth()->user()->id;
            $user_role = Auth()->user()->role;

            try {
                $story = Story::findOrFail($id);
            } catch (ModelNotFoundException $ex) {
                return response()->json(['error' => 'Story not found.'], 404);
            }

            if($user_role !== 'admin' && $story['user_id'] !== $user_id)
                return response()->json([
                    'message' => 'You can\'t remove this story'
                ], 201);

            $story->delete();

            return response()->json(['status' => 'success','message'=>'successfully deleted'], 200);
            // return redirect()->route($user_role.'.stories');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An error occurred while deleting the story. Please try again later.']);
        }
    }
}
