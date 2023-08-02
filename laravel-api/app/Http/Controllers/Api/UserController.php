<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return $request->user();
    }

    public function users(Request $request) {
        return User::all();
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());

        return response()->json([
            'user'    => $user,
            'message' => 'User created!',
        ], 201);
    }

    public function update(UpdateUserRequest $request, $id) {
        try {
            $validatedData = $request->validated();
            $user = User::findOrFail($id);
            $user->update($validatedData);

            return redirect()->route('admin.users');
        } catch (ModelNotFoundException $ex) {
            return response()->json(['error' => 'User not found.'], 404);
        } catch (ValidationException $ex) {
            return response()->json(['error' => $ex->errors()], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $ex) {
            return response()->json(['error' => 'An error occurred'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete($id) {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return redirect()->route('admin.users');
        } catch (ModelNotFoundException $ex) {
            return response()->json(['error' => 'User not found.'], 404);
        } catch (ValidationException $ex) {
            return response()->json(['error' => $ex->errors()], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $ex) {
            return response()->json(['error' => 'An error occurred'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
