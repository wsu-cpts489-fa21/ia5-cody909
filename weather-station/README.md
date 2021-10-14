# Individual Assignment #5

## Author
Cody Mercadante

## Project Board
[Link to project board](https://github.com/wsu-cpts489-fa21/ia5-cody909/projects/1)

## Completed Tasks and Issues
Here are links to the issues associated with the tasks that I completed in this assignment:
|Task # | Issue |
|----------|-----------------------|
|1 | [Issue #1](https://github.com/wsu-cpts489-fa21/ia5-cody909/issues/1) |
|2 | [Issue #2](https://github.com/wsu-cpts489-fa21/ia5-cody909/issues/2) |
|3 | [Issue #3](https://github.com/wsu-cpts489-fa21/ia5-cody909/issues/3) |
|4 | [Issue #4](https://github.com/wsu-cpts489-fa21/ia5-cody909/issues/4) |
|5 | [Issue #4](https://github.com/wsu-cpts489-fa21/ia5-cody909/issues/5) |
|6 | [Issue #4](https://github.com/wsu-cpts489-fa21/ia5-cody909/issues/6) |


## Reflections
One thing I struggled on with this assignment was the delete functionality but I was able to work through it by looking at how the rows were created and adapting that logic in order to delete a weather station. Another thing I struggled with was the refresh button, particularly because when I hit the refresh button and it was toggled to imperial units it would switch back to metric units because that is the default when you fetch data. And I couldn't set the new state and then toggle units because set state does not happen immediately. So I solved this problem by performing the calculation within setting the observations state if the current state of units was imperial.

## Notes
Github pages isn't not working when I deploy it so I added a gif demonstrating the features. Also, I accidentally starting working on this in a different repo and had to transfer it over which is why all the commits are together. And I don't like using class components so I refactored the class code with functional components.