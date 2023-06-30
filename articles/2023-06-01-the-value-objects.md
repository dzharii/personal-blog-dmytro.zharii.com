# The Value Objects
Date: 2023-06-01

I will allow myself to think outside the box. (from the aww tools)



> [!NOTE]
>
> This is a never-ending article, always in beta version.



## Value Objects in a Nutshell

Added: 2023-06-30

**What is a Value Object?** A Value Object is a programming design pattern. Its main role is to encapsulate and represent a specific value and its associated behavior. For example, a distance object encapsulating a distance value and related methods like convertToMiles().

**Key Properties**

1. **Immutability:** Once created, the state of a Value Object cannot be changed. If any change is needed, a new object must be created.
2. **Self-Validation:** Value Objects validate their values, ensuring they're always correct and consistent after creation.
3. **Equality:** Value Objects are equal if their values are equal, not based on identity.
4. **No side effects:** Methods in Value Objects don't change the objects' states or any other global state.
5. **Value-based:** They represent things by their attributes, not their identity.

**When to use Value Objects?** Use Value Objects when you need to represent values that come with related behavior. They help reduce bugs, clean code, and make it more readable and maintainable. They're perfect for:

1. Encapsulating validation logic.
2. Ensuring data consistency.
3. Making code more self-descriptive and expressive.
4. Representing domain concepts accurately.

**Cheat Sheet**

Declaration:

[!code-javascript[](2023-06-01-the-value-objects.assets/code-snippets/10__Meters-Cheatsheet.js)]

Usage Example:
[!code-html[](2023-06-01-the-value-objects.assets/code-snippets/10__Meters-Usage.html)]

[!code-javascript[](2023-06-01-the-value-objects.assets/code-snippets/10__Meters-Usage.js)]

## Main article, a lot of words!

In this article, we explore the concept of Value Objects. We start by understanding their role in ensuring data integrity, using a simple example of representing distances. We then delve into key features of Value Objects like constructor validation and immutability.

We enhance our example by introducing common operations into our Value Object, demonstrating cleaner and more intuitive code. We also illustrate the use of Value Objects for input parameters in the context of a legacy system bug fix, showcasing their power in code expressiveness and safety.

Finally, we emphasize the importance of unit testing in verifying the behavior of our Value Objects. By the end, you will have a comprehensive understanding of how to implement Value Objects effectively in your codebase.



## The Value of Value Objects

Value Objects. Value Objects come in all sorts of shapes and sizes. Let's dive into an example that seems simple at first.

This is an example from the normal life, for starters. 

```csharp
void PrintDistance(int meters) {
  WriteLine($"The distance is {meters} m.");
}
```
This code looks just fine until we start to ponder some hard questions. Can we fully trust the `int meters`? How can we **ensure** that the variable `meters` holds a **valid** value? What if someone mistakenly feeds the distance in **feet** into our function? So, **who** is on guard to **validate** `int meters`?

Suddenly, our straightforward example might become a tricky puzzle when we think about validation. No one-size-fits-all solution exists to this issue because the correct answer might change based on different circumstances.

However, we could consider a different approach. Let's modify our previous code to something like this:

```cs
void PrintDistance(Meters distance) {
  WriteLine($"The distance is {distance.Value} m.");
}
```

We've swapped `int meters` with `Meters distance`. Here, `Meters` **becomes a Value Object**. 

Think of it as a reliable friend that promises to always hold a valid value once it's created. This way, we're passing the responsibility of providing correct data to the Caller. Now, it's up to the Caller to provide a valid "Meters distance". It's a subtle but effective way to keep the integrity of our PrintDistance function. How's that for a twist?



## Inside the Value Objects

*"Only Sith and Value Objects deal in absolutes, Anakin!" - Obi-Wan KeBoolean*



### Constructor Validation

One of the **key features** of **value objects** is their commitment to **always** contain a **valid** value — well, at least as valid as our programming allows it to be. A simple and effective way to ensure this is by incorporating validation into the **constructor**. 

So, it's a pretty straightforward situation: either we **create a valid value** object **or** run into an **error**. No third option here!



Let's reconsider our Meters example. While there isn't a one-size-fits-all approach to thoroughly validate Meters, we can tailor our validation to fit the project's specific needs. We'll lay down some ground rules based on the business requirements. So, for the purposes of this article, here's what we'll go with:

> [!NOTE]
>
> 1. Meters are represented **as integer** values because we're not sweating the small stuff — centimeters don't concern us here.
> 2. Meters must be **positive integers**. Why? Because in our world, we don't do negative distances.
> 3. The value for Meters **can't exceed 999**. It's a bit of an old-school restriction, but it's still hanging around.



Let's see an example of how Meters might be implemented in C#.

[!code-csharp[](2023-06-01-the-value-objects.assets/code-snippets/10__Meters.cs)]



### Immutability

Another very **essential property** for value objects is **immutability**. This means that once value objects are created, they are set in stone – the value they encapsulate doesn't change. It's read-only or "immutable". The specifics of how you implement this characteristic can differ based on your chosen programming language.

For example, in C#, integers are inherently immutable. There's no need to add extra code to duplicate the value. However, for more complex scenarios, adding some code to return a clone of the value stored within the value object is necessary.

Let's illustrate this using our Meters class. We'll demonstrate how to sum two instances of Meters:

[!code-csharp[](2023-06-01-the-value-objects.assets/code-snippets/20_Add_Meters.cs)]

Value objects, like in our Meters example, can be customized to fit the specific needs of your application and coding style. We've noticed a frequent operation - adding Meters together. It makes sense to embed this operation into the Meters class by introducing an `Add()` method. This adjustment not only leads to cleaner code but also enhances its intuitiveness.

[!code-csharp[](2023-06-01-the-value-objects.assets/code-snippets/30_Add_Meters_Method.cs)]

Please note: once created, the **value objects must remain valid**. This is the core property. And the most straightforward way to keep the value objects valid is to make them immutable.



## Value Objects for Input Parameters

Hey there, dear Reader! Kudos for sticking around through this deep dive. You may think, "This is all great, but what about the slower code when adding Meters?" Hang tight – we'll address performance concerns a bit later. Let's shift our focus to a scenario where performance isn't an issue and Value Objects truly shine: when they're used to encapsulate program input parameters.

Imagine this – we've got an old-school legacy system using Postgres SQL for data storage. Occasionally, a sneaky bug creates chaos – messing up data links or dropping in duplicate records. We're on a mission to find the root cause, but in the meantime, we need to keep our database in order.

What's our strategy? We decide to roll out a maintenance script – a triage workflow to patch up the data wounds. It's not a cure-all; we can't heal the buggy code. It's a bit like changing a tire on a moving car – risky, sure, but necessary. The System needs to stay online and handle user requests.

[!code-csharp[](2023-06-01-the-value-objects.assets/code-snippets/40_workflow.cs)]

Our program is running smoothly! We've effectively validated parameters based on our business rules. There's room for unit tests, but let's keep this article simple.
Let's say our approach is so practical that we're tasked with creating more workflows. Before we know it, we've got a whole set of them, each validating things like customer IDs, order dates, and last modified dates. We could streamline our code by putting our validation logic into a method like 'ValidateCustomerId', but what if someone forgets to use it down the line?
This brings us to an exciting solution: how about making it impossible to create an incorrect CustomerId instance? This is exactly where Value Objects come into play!

The main class:

[!code-csharp[](2023-06-01-the-value-objects.assets/code-snippets/50_MainClass.cs)]

You might notice how much clearer our code has become.

```csharp
CustomerId customerId = CustomerId.Parse(args[0]);
```

When you call `CustomerId.Parse`, it pulls the GUID from a string and creates a Value Object. This step also makes sure that the CustomerId is correct. Yes, it takes a few more lines of code to create these Value Objects, but don't worry. We'll keep these classes neatly tucked away in their own separate files. In future workflows, we can use these Value Objects without looking into their source code. After all, how often do we peek under the hood of `System.String` or `System.Guid`? Not very, right?

Value objects:

[!code-csharp[](2023-06-01-the-value-objects.assets/code-snippets/50_workflow-value-objects.cs)]

Unit tests for `CustomerId`:

[!code-csharp[](2023-06-01-the-value-objects.assets/code-snippets/50_unit-tests.cs)]

Highlight: We need to write unit tests once and only once since we do not repeat the validation logic and keep it inside the `CustomerId`. 



## The Advantages of Value Objects

- Eliminates redundancy. The object itself is the single source of truth.
- Reduces testing efforts. By removing duplication, we need to write just one test per behavior. All validation checks are encapsulated within the object, so we don't need to worry about handling invalid data.
- Leverages compiler checks in statically typed languages. You can't supply anything but a `CustomerId` when it's required, boosting code robustness. Even in dynamic languages, the error traces are more helpful than with primitive types.
- Minimizes the chance of argument misconfiguration. Now `CustomerId` is a strongly typed object, not a generic string.
- Streamlines code expectations. Using our `CustomerId` example, we can rely on class preconditions to ensure things like non-null, non-empty forenames and surnames of a certain length. A basic string can't provide such guarantees.
- Encourages making value objects public, which can benefit testing and integration.



## Once More, Anakin!
Value objects are tailor-made for Sith. As Sith, we **don't assume - we assert!** 
When we establish our communication interface using value objects:

```csharp
public static void ExecuteWorkflow(CustomerId customerId, OrdersPlaced ordersPlaced, OrderLastModified lastModified)
{
    Database.UpdateRecord(customerId.Value, ordersPlaced.Value, lastModified.Value);
}
```
We affirm that the **caller's responsible** for supplying us with valid values. Correcting erroneous data lies with the **caller** - they must handle this before creating the value object. This approach forms a **clear boundary**, thus enhancing communication across different program components.



## Value Objects in C language

*Added: 2023-06-22*

Let's talk about C. For those who code in this language, there's a good reason for doing so. I, for one, wouldn't claim to be a C maestro, so remember to take my words with a grain of salt.

Here's the deal with C: it gives you all the power to code at a low system level, but it doesn't come without a catch. It demands meticulous attention and discipline. In C, the blame game ends on your keyboard. Every mistake is your own doing. It's not about the language or the compiler; it's all about you. So, beware.

Now, don't let this scare you off. It should encourage you. Who doesn't enjoy a good puzzle? And I still find myself tripping over some double-pointer arithmetic occasionally.

In C, notions like "read-only" or "private" data don't quite fit in. Immutability? More of a mental construct than a language feature. It's C, after all.

That being said, there's a trick we can use to make things more organized: value objects. These self-validating objects can be pretty handy. Not only do they ensure our data is in the right state, but they also help keep our code clean and easy to understand.

If you haven't already, give value objects a try. They might be the secret ingredient you didn't know you were missing.

**main.c:**
[!code-c[](2023-06-01-the-value-objects.assets/code-snippets/2023-06-11-the-c-lang-value-object/main.c)]

**error.h:**
[!code-c[](2023-06-01-the-value-objects.assets/code-snippets/2023-06-11-the-c-lang-value-object/error.h)]

**meters.h:**
[!code-c[](2023-06-01-the-value-objects.assets/code-snippets/2023-06-11-the-c-lang-value-object/meters.h)]

**operation.h:**
[!code-c[](2023-06-01-the-value-objects.assets/code-snippets/2023-06-11-the-c-lang-value-object/operation.h)]

**meters.c:**
[!code-c[](2023-06-01-the-value-objects.assets/code-snippets/2023-06-11-the-c-lang-value-object/meters.c)]

**operation.c:**
[!code-c[](2023-06-01-the-value-objects.assets/code-snippets/2023-06-11-the-c-lang-value-object/operation.c)]

[readme.md](2023-06-01-the-value-objects.assets/code-snippets/2023-06-11-the-c-lang-value-object/readme.md)



Ah, the code snippet before us. It seems to raise more questions than it answers. Now, you might be staring at it, scratching your head, and wondering... Is this a Value Object? Sadly, no. I must apologize; I pulled a fast one on you. 

Firstly, the hallmark of value objects is their immutability post-creation. We should be able to rely on our programming language to lock our data down, making it immutable or at least read-only. We usually do this by tucking our data away in private members and using getters to access them. But, ah, this is where C pulls a face at us. In C, there are no off-limits; you can change anything in `struct meters` at any time. Thus, adding a `meters` getter doesn't make much sense here.

Despite this, some facets of value objects, such as the coding style and organization, can be useful. 
Consider this function: 
```cpp
meters* perform_operation_on_meters(meters* m1, meters* m2, operation* op) {
... 
}
```
Notice how it is strongly typed? This little nuance helps establish a more precise code contract; for example, you can't pass feet as a parameter here (unless you're fond of type-casting). On the other hand, if we were using `double`, it would be an open house - feet, hours, temperature, all are welcome. Strong types inject some much-needed clarity. 

Also, the function returns a `meters*`. This requires us to use `meters_new` **BEFORE** returning results, and we can trust the result to be correct. There's no need to validate over and over again. 

To sum up, while our example may not be a value object, it has its own charm. It helps clarify our code with strong types and reusable validation logic. So, while it's not perfect, it's still a step in the right direction. And that's not half bad.




> [!NOTE]
>  I don't know to where this article will go, but 
> *To be continued...* 
> End of Revision 2023-06-01
